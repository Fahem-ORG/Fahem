from typing import Optional
from uuid import uuid4
from langchain.agents import AgentExecutor
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.agents.openai_functions_agent.base import OpenAIFunctionsAgent
from langchain.prompts import MessagesPlaceholder
from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain_core.messages import SystemMessage
from langchain.agents.openai_functions_agent.agent_token_buffer_memory import (
    AgentTokenBufferMemory,
)

from langchain.agents.agent_toolkits import (
    create_retriever_tool,
)
from langchain_google_genai import GoogleGenerativeAIEmbeddings,ChatGoogleGenerativeAI
import chromadb

from config.config import get_fahem_config

LH_CONFIG = get_fahem_config()
client = (
    chromadb.HttpClient(host=LH_CONFIG.ai_config.chromadb_config.db_host, port=8000)
    if LH_CONFIG.ai_config.chromadb_config.isSeparateDatabaseEnabled == True
    else chromadb.Client()
)


chat_history = []


def ask_ai(
    question: str,
    message_history,
    text_reference: str,
    message_for_the_prompt: str,
    embedding_model_name: str,
    google_model_name: str,
):
    # Get API Keys
    LH_CONFIG = get_fahem_config()
    google_api_key = LH_CONFIG.ai_config.google_api_key

    # split it into chunks
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    documents = text_splitter.create_documents([text_reference])
    texts = text_splitter.split_documents(documents)

    embedding_models = {
        "models/text-embedding-004": GoogleGenerativeAIEmbeddings,
        "models/text-embedding-001" : GoogleGenerativeAIEmbeddings
    }

    embedding_function = None

    if embedding_model_name in embedding_models:
        if embedding_model_name == "models/text-embedding-004":
            embedding_function = embedding_models[embedding_model_name](
                model=embedding_model_name, api_key=google_api_key
            )
        elif embedding_model_name == "models/text-embedding-001":
            embedding_function = embedding_models[embedding_model_name](
                model=embedding_model_name, api_key=google_api_key
            )
    else:
        raise Exception("Embedding model not found")

    # load it into Chroma and use it as a retriever
    db = Chroma.from_documents(texts, embedding_function)
    tool = create_retriever_tool(
        db.as_retriever(),
        "find_context_text",
        "Find associated text to get context about a course or a lecture",
    )
    tools = [tool]

    llm = ChatGoogleGenerativeAI(
        temperature=0.7, google_api_key=google_api_key, model=google_model_name ,convert_system_message_to_human=True
    )

    memory_key = "history"

    memory = AgentTokenBufferMemory(
        memory_key=memory_key,
        llm=llm,
        chat_memory=message_history,
        max_token_limit=1000,
    )

    system_message = SystemMessage(content=(message_for_the_prompt))

    prompt = OpenAIFunctionsAgent.create_prompt(
        system_message=system_message,
        extra_prompt_messages=[MessagesPlaceholder(variable_name=memory_key)],
    )

    agent = OpenAIFunctionsAgent(llm=llm, tools=tools, prompt=prompt)

    agent_executor = AgentExecutor(
        agent=agent,
        tools=tools,
        memory=memory,
        verbose=True,
        return_intermediate_steps=True,
        handle_parsing_errors=True,
    )

    return agent_executor({"input": question})


def get_chat_session_history(aichat_uuid: Optional[str] = None):
    # Init Message History
    session_id = aichat_uuid if aichat_uuid else f"aichat_{uuid4()}"

    LH_CONFIG = get_fahem_config()
    redis_conn_string = LH_CONFIG.redis_config.redis_connection_string

    if redis_conn_string:
        message_history = RedisChatMessageHistory(
            url=redis_conn_string, ttl=2160000, session_id=session_id
        )
    else:
        print("Redis connection string not found, using local memory")
        message_history = []

    return {"message_history": message_history, "aichat_uuid": session_id}
