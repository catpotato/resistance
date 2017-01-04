from wtforms import Form, StringField, SubmitField

class LoginForm(Form):
	username = StringField("Username: ")
	room = StringField("Room (Blank for new room): ")
	submit = SubmitField("Play")
