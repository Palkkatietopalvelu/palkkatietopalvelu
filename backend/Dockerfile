FROM python:3.10 as requirements-stage

WORKDIR /tmp

RUN pip install poetry

COPY poetry.lock pyproject.toml /tmp/

RUN chmod -R 755 ./

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.10

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV FLASK_APP=src/app:app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

COPY --from=requirements-stage /tmp/requirements.txt /app/requirements.txt

RUN chmod -R 755 /app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . .

RUN chmod -R 755 /app

EXPOSE 5000

WORKDIR /app/src

CMD ["gunicorn", "-b", "0.0.0.0:5000", "-w", "4", "app:app"]