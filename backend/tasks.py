from invoke import task

@task
def start(ctx):
    ctx.run("poetry run flask --app src/app.py run")

@task
def lint(ctx):
    ctx.run("pylint src", pty=True)

@task
def test(ctx):
    ctx.run("pytest src", pty=True)

@task
def coverage(ctx):
    ctx.run("coverage run --branch -m pytest src", pty=True)

@task
def coverage_report(ctx):
    ctx.run("coverage html", pty=True)
