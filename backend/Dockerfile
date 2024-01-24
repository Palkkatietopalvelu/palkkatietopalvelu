FROM python:3.10

WORKDIR /app

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

COPY poetry.lock pyproject.toml /app/

RUN pip install poetry  \
    && poetry config virtualenvs.create false \
    && poetry install

COPY . .

EXPOSE 5000

CMD [ "poetry", "run", "flask", "--app", "src/app.py", "run"]