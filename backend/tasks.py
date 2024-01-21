from invoke import task

@task
def start(ctx):
    ctx.run("poetry run flask --app src/app.py run")

@task
def lint(ctx):
    ctx.run("pylint src", pty=True)
