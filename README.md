# jjack_hackathon
GT Unearthed Hackathon

Built with:
- Data science libraries: [pandas](http://pandas.pydata.org/),
 [scikit-learn](http://scikit-learn.org/),
 [NumPy](http://www.numpy.org/),
 [Keras](https://keras.io/)
- UI designed in: [Angular](https://angular.io/) & [Foundation](https://foundation.zurb.com/)
- Charting with: [Plotly](https://plot.ly/)
- CI/CD provider: [CircleCI](https://circleci.com/)
- Hosted on: [AWS](https://aws.amazon.com/)

### Running the UI locally
1. `brew install node`
1. `npm install -g @angular/cli`
1. `cd jjack-ui`
1. `npm install`
1. `ng serve`

# Our Team
JJACKZ (JJACK and Zach Hack):  Jordan H., Anne, Christine, and Karen met as Data Science Immersive students at Galvanize.  Jordan F. and Zach joined us for the Hackathon this weekend.

# The Problem
Autoclaves are high pressure and high temperature circuits used for separating sulfide materials from gold, and each autoclave includes seven agitators.  An agitator failure is both dangerous and costly.  When an agitator fails, the entire plant must shut down, which can cost $150,000 per hour.  Due to the autoclaves' importance, sensors monitor the agitators constantly, collecting a wealth of data that we were able to analyze.  We built a machine learning algorithm to predict when an agitator was likely to fail, enabling timely preventative repairs.

# The Model
We use a long short term memory neural network to predict days until failure for each agitator.  This type of model works well with time series data.  As new data is fed into the model, the long short term neural network considers preceding values in addition to the current values, and weighs the importance of those preceding values based on how recently they occurred.  This is similar to smoothing, which is a common time series data preprocessing step.  We use supervised learning, using dates of known failures to engineer a target variable of days until failure for each agitator.  To confirm the accuracy of our model, we reserved data from 2017 for testing.  When training our neural net, we selected root mean squared logarithmic error for our error metric.  Unlike most standard error metrics, RMSLE weighs the difference between 2 and 4 days as heavily as the difference between 200 and 400 days.  We chose this error function because the precision of our model matters more when a failure is imminent.  When our model was fully trained on the available data, its RMSLE score was 0.6.  We have ideas for improving our model, but at the moment we're interpreting a prediction with a 50% interval.

# The Product
Our web application takes in a stream of sensor data, feeds it to our model so that the model can continue to learn and improve, and outputs a predicted number of days until failure for each agitator.  At the top of our dashboard, we highlight agitators that our model predicts are within 30 days of failure, along with those agitators' temperature, vibration, and cooling water, which we identified as those features with the greatest impact.  Lower down on the page, predictions and data are available for each agitator in the system, sorted by how soon our model predicts a failure.  We have also included a graph that updates in real time as new sensor data becomes available, with an interactive interface that allows the user to select, zoom in, and see underlying data.

# Next Steps
We have several ideas for improving our model.  As of this moment, aside from the target variable, we have left most feature engineering to the black box of the neural network.  In future versions, we would do more feature engineering during our preprocessing of the data.  We would also dive into anomaly detection using auto encoders.  Ideally, this would lead to insights that would improve our feature engineering.  At worst, anomaly detection would enable us to alert our app's users to any odd occurrence, even if we were unable to directly relate it to agitator failure.
