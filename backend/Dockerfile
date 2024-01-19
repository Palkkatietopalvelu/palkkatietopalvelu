FROM python:3.8

WORKDIR /app

ENV FLASK_APP=app.py

COPY poetry.lock pyproject.toml /app/

RUN pip install poetry && poetry install

COPY . .

EXPOSE 5000

CMD [ "poetry", "run", "flask", "--app", "src/app.py", "run"]