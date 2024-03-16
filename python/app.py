from flask import Flask, render_template
from database import init_db
from routes import bp

app = Flask(__name__)
app.register_blueprint(bp)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    init_db()
    app.run(debug=True)