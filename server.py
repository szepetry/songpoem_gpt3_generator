from flask import Flask
from flask import render_template
from flask import request, jsonify
import pandas as pd
# import config
import openai
import json
openai.api_key = "<OPENAI GPT3 API KEY>"

app = Flask(__name__)

# initial route called when page loaded via GET request


@app.route('/')
def song_poem():
    return render_template("song_poem.html")


@app.route('/makesongpoem', methods=["POST"])
def make_song_poem():
    prompt = request.json["prompt"]
    completion = openai.Completion.create(
        engine="text-davinci-002", max_tokens=500, prompt=prompt)
    result = completion.choices[0].text.strip()
    return jsonify(result)


@app.route('/topicmodify', methods=["POST"])
def modify_topic():
    prompt = request.json["prompt"]
    completion = openai.Completion.create(
        engine="text-davinci-002", max_tokens=500, prompt=prompt)
    result = completion.choices[0].text.strip()
    return jsonify(result)


@app.route('/songview')
def song_view():
    return render_template("song.html")


@app.route('/poemview')
def poem_view():
    return render_template("poem.html")


@app.route('/topic_modify')
def topic_modify_view():
    return render_template("topic_modify.html")

@app.route('/artist_modify')
def artist_modify_view():
    return render_template("artist_modify.html")

@app.route('/reference_modify')
def reference_modify_view():
    return render_template("reference_modify.html")

@app.route('/title')
def get_title():
    return render_template("title.html")

@app.route('/summarize')
def get_summary():
    return render_template("summarize.html")


if __name__ == "__main__":
    app.run(debug=True)
