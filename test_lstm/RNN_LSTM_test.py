
import pandas as pd
import numpy as np
from string import punctuation, printable
from sklearn.preprocessing import LabelEncoder, MinMaxScaler, StandardScaler
from sklearn.model_selection import train_test_split
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.layers import Embedding, LSTM, Dense, Dropout, Conv1D, MaxPooling1D
from keras.models import Sequential
from imblearn.over_sampling import SMOTE
import datetime
from matplotlib import pyplot

class RNN:
    def __init__(self):
        self.df = None
        self.X = None
        self.y = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.model = None
        self.score = None
        self.history = None

    def df_from_csv(self):
        '''
        Bring in the data and split X and y values
        '''
        print('Bringing data in...')
        self.df = pd.read_pickle('B_350.pkl')
        self.train = self.df[self.df.index <= datetime.datetime(2015,2,1)]
        self.test = self.df[self.df.index > datetime.datetime(2015,2,1)]
        self.y_train = self.train.pop('target')
        self.y_test = self.test.pop('target')
        self.X_train = self.train[['Autoclave Level', 'Autoclave Total Feed', 'Autoclave Pressure']].values
        self.X_test = self.test[['Autoclave Level', 'Autoclave Total Feed', 'Autoclave Pressure']].values
        print(self.y_train)
        print(self.X_train)

    def make_labels(self):
        print('Lable encoding...')
        le = LabelEncoder()
        self.y = le.fit_transform(self.y)

    def min_max_scaler(self):
        print('Scalin Data...')
        X_scaler = MinMaxScaler(feature_range=(0, 1))
        self.X_train = X_scaler.fit_transform(self.X_train)
        self.X_test = X_scaler.transform(self.X_test)

    def st_scaler(self):
        print('Scalin Data...')
        X_scaler = StandardScaler()
        self.X_train = X_scaler.fit_transform(self.X_train)
        self.X_test = X_scaler.transform(self.X_test)

    def break_out(self):
        self.X_train = self.X_train.reshape((self.X_train.shape[0], 1, self.X_train.shape[1]))
        self.X_test = self.X_test.reshape((self.X_test.shape[0], 1, self.X_test.shape[1]))

    def resample(self):
        '''
        Jordan's Note: SMOTE hasn't always been great - be careful with this if we use it
        '''
        print('SMOTEing...')
        sm = SMOTE(random_state=12)
        self.X_train, self.y_train = sm.fit_sample(self.X_train, self.y_train)

    def lstm(self):
        print('LSTMing...')
        self.model = Sequential()
        self.model.add(LSTM(50, input_shape=(self.X_train.shape[1], self.X_train.shape[2])))
        self.model.add(Dense(1))
        self.model.add(Dense(1))
        self.model.compile(loss='mean_squared_logarithmic_error', optimizer='adam')
        #self.model.add(Conv1D(64, 5, activation='relu'))
        #self.model.add(LSTM(128, dropout=0.2, recurrent_dropout=0.2))
        #self.model.add(Dense(6, activation='softmax'))
        self.history = self.model.fit(self.X_train, self.y_train, batch_size=128, epochs=100, validation_data=(self.X_test, self.y_test))

    def get_score(self):
        self.score = self.model.evaluate(self.X_test, self.y_test)

    def plots(self):
        pyplot.plot(self.history.history['loss'], label='train')
        pyplot.plot(self.history.history['val_loss'], label='test')
        pyplot.legend()
        pyplot.show()


if __name__ == '__main__':
    rnn = RNN()
    rnn.df_from_csv()
    # rnn.min_max_scaler()
    # rnn.break_out()
    # rnn.lstm()
    # rnn.get_score()
    # print("Score: ", rnn.score)
    # rnn.plots()
