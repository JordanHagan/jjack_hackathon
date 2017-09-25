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
    bad_cols = [col for word in ['Current', 'Power', 'O2', 'Speed']
                for col in data.columns if word in str(col)]
    dummy_cols = [150, 250, 350]
    agitator_data = data.drop(bad_cols, axis=1)
    agitator_cols = [col for col in agitator_data.columns if ' {} '.format(agitator) in str(col)]
    agitator_data = data.loc[data.AUT == autoclave, autoclave_cols + agitator_cols + dummy_cols]
    return agitator_data

def create_targeted(data, autoclave, agitator, fail_date_list):
    agitator_data = limit_dataframe(data, autoclave, agitator)
    agitator_data = agitator_data[agitator_data.index < max(fail_date_list)]
    target = agitator_data.index.to_series().apply(
        lambda d: days_to_failure(d, fail_date_list))
    agitator_data['target'] = target
    agitator_data.columns = ['Autoclave Total Feed', 'Autoclave Level',
       'Autoclave Vent Valve Position', 'Autoclave Pressure',
       'Agitator Vibration', 'Agitator Cooling Water',
       'Agitator temperature', 'Autoclave Compartment temperature', 150, 250, 350,
       'target']
    return agitator_data

if __name__ == '__main__':
    data = pd.read_pickle('numeric_data.pkl')
    dummies = pd.get_dummies(data['AUT']).drop(450, axis=1)
    data = data.merge(dummies, right_index=True, left_index=True)

    B_350 = create_targeted(data, 350, 'B', [datetime.datetime(2014, 4, 25)])
    C_350 = create_targeted(data, 350, 'C', [datetime.datetime(2015, 11, 3),
                                             datetime.datetime(2016, 11, 7)])
    D_150 = create_targeted(data, 150, 'D', [datetime.datetime(2015, 4, 6)])
    D_250 = create_targeted(data, 250, 'D', [datetime.datetime(2014, 1, 7)])
    D_450 = create_targeted(data, 450, 'D', [datetime.datetime(2015, 11, 27)])

    all_together_now = pd.concat([B_350, C_350, D_150, D_250, D_450])
    all_together_now.to_pickle('all_together_now.pkl')

    # B_350.to_pickle('B_350.pkl')
    # C_350.to_pickle('C_350.pkl')
    # D_150.to_pickle('D_150.pkl')
    # D_250.to_pickle('D_250.pkl')
    # D_450.to_pickle('D_450.pkl')
