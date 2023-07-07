import gspread

from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds'] 
credentials = ServiceAccountCredentials.from_json_keyfile_name('nom_fichier_json', scope)
gc = gspread.authorize(credentials)
worksheet = gc.open('Nom_du_Feuillet').sheet1
data = worksheet.get_all_values()
print(data)