import logging
from config.config import get_fahem_config
from fastapi import FastAPI
from sqlmodel import SQLModel, Session, create_engine

fahem_config = get_fahem_config()
engine = create_engine(
    fahem_config.database_config.sql_connection_string, echo=False, pool_pre_ping=True  # type: ignore
)
SQLModel.metadata.create_all(engine)


async def connect_to_db(app: FastAPI):
    app.db_engine = engine  # type: ignore
    logging.info("Fahem database has been started.")
    SQLModel.metadata.create_all(engine)


def get_db_session():
    with Session(engine) as session:
        yield session


async def close_database(app: FastAPI):
    logging.info("Fahem has been shut down.")
    return app
