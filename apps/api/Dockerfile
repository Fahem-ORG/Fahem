# 
FROM python:3.12

# poetry 
RUN pip install poetry

# 
WORKDIR /usr/fahem/apps/api

# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./poetry.lock* /usr/fahem/

# Copy project requirement files here to ensure they will be cached.
COPY pyproject.toml /usr/fahem/

# Install poetry
RUN pip install --upgrade pip \
    && pip install poetry \
    && poetry config virtualenvs.create false

# Install project dependencies.
RUN poetry install --no-interaction --no-ansi

# 
COPY ./ /usr/fahem

# 
CMD ["python" , "app.py"]
