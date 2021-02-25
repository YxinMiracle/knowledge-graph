from flask import Flask
from serv.get_anythings import get_anythings
from serv.get_knowledge_graph import get_knowledge_graph

app = Flask(__name__)

app.config["DEBUG"] = True

app.register_blueprint(get_anythings)
app.register_blueprint(get_knowledge_graph)

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
