'''

For a given autoclave, agitator pair, limit_dataframe limits to the relavant
columns and rows.

For a given autoclave, agitator pair, and a list of dates when that autoclave/agitator
failed, create_targeted returns the liited dataframe with an aditional target column
that is days until the next failure.  This limit dataframe will not have rows past the
final failure date (since what would the target be in that case).

'''


import numpy as np
import pandas as pd
import datetime


def days_to_failure(row_date, fail_date_list):
    failures_after_row_date = [date for date in fail_date_list if date > row_date]
    if len(failures_after_row_date) == 0:
        return np.nan
    fail_date = min(failures_after_row_date)
    return (fail_date - row_date).days

def limit_dataframe(data, autoclave, agitator):
    autoclave_cols = ['Autoclave Total Feed', 'Autoclave Level',
       'Autoclave Vent Valve Position', 'Autoclave Pressure']
    agitator_cols = [col for col in data.columns if ' {} '.format(agitator) in col]
    agitator_data = data.loc[data.AUT == autoclave, autoclave_cols + agitator_cols]
    return agitator_data

def create_targeted(data, autoclave, agitator, fail_date_list):
    agitator_data = limit_dataframe(data, autoclave, agitator)
    agitator_data = agitator_data[agitator_data.index < max(fail_date_list)]
    target = agitator_data.index.to_series().apply(
        lambda d: days_to_failure(d, fail_date_list))
    agitator_data['target'] = target
    return agitator_data

if __name__ == '__main__':
    data = pd.read_pickle('numeric_data.pkl')
    targeted_data = create_targeted(data, 350, 'C', [datetime.datetime(2015, 11, 3)])
