from wtforms import Form, StringField, SubmitField

class LoginForm(Form):
	username = StringField("username")
	room = StringField("room")
	submit = SubmitField("PLAY")
