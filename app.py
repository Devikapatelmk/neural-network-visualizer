from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Example model
model = {
    "layers": [3, 5, 4, 2]
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/model")
def get_model():
    return jsonify(model)

if __name__ == "__main__":
    app.run(debug=True)
