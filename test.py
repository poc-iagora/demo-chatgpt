import openai

# Configurer votre clé d'API
openai.api_key = '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'

# Appeler l'API GPT
response = openai.Completion.create(
    engine='text-davinci-003',
    prompt='raconte moi brievement la vie de einstein',
    max_tokens= 1000
)

# Traiter la réponse
answer = response.choices[0].text.strip()

# Afficher la réponse
print(answer)