from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
import numpy as np
from collections import defaultdict
from keras.models import load_model
from flask_cors import CORS


app = Flask(__name__)

CORS(app)

with open('2017_dict.pkl','rb') as f:
    test_dict = pickle.load(f)   
    
with open('pickled_models/scaler_model.pkl','rb') as g:
    ss = pickle.load(g)
    
model = load_model('pickled_models/rnn_model.h5')


autoclaves = ['150','250','350','450']
agitators = ['A','B','C','D','E','F','G']
features = ['vibration','coolingWater','temperature','compartmentTemperature']

tree = lambda: defaultdict(tree)
dct = tree()

for autoclave in autoclaves:
    for agitator in agitators:
        for feature, i in zip(features,range(3,7)):
            dct[autoclave]['agitators'][agitator][feature] = test_dict[autoclave][agitator][test_dict[autoclave][agitator].columns[i]][-1]
        scaled = ss.transform(test_dict[autoclave][agitator].values)
        scaled = scaled.reshape((scaled.shape[0], 1, scaled.shape[1]))
        prediction = model.predict(scaled)
        dct[autoclave]['agitators'][agitator]['daysToFailure'] = int(prediction[-1][0])
dct['150']['upDate'] = '2016-11-23'
dct['250']['upDate'] = '2017-02-12'
dct['350']['upDate'] = '2016-11-23'
dct['450']['upDate'] = '2017-02-08'



# for autoclave in autoclaves:
#     for agitator in agitators:
#         scaled = ss.transform(test_dict[autoclave][agitators].values)
#         prediction = model.predict(scaled)
#         dct[autoclave]['agitators'][agitator]['daysToFailure'] = prediction

    
    
@app.route('/data', methods =['GET','POST'])    
def data():
    
    return jsonify(dct)


    
if  __name__ == '__main__':
    app.run(host='0.0.0.0', port=8105, debug=True)