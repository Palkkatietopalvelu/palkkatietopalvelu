FROM python:3.10

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV FLASK_APP=src/app:app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

COPY poetry.lock pyproject.toml /app/

RUN python3 -m venv venv

RUN chmod -R 755 /app

RUN pip install poetry  \
    && poetry config virtualenvs.create false \
    && poetry config virtualenvs.in-project true \
    && poetry install

COPY . /app/

RUN chmod -R 755 /app

EXPOSE 5000

CMD ["poetry", "run", "gunicorn", "-b", "0.0.0.0:5000", "-w", "4", "src.app:app"]