from djoser.email import PasswordResetEmail
from django.core.mail import send_mail


class CustomPasswordResetEmail(PasswordResetEmail):
    def get_context_data(self):
        context = super().get_context_data()
        user = context["user"]
        reset_url = f"http://localhost:3000/reset-password/{context['uid']}/{context['token']}"
        context["message"] = (
            f"Olá {user.email},\n\n"
            f"Para redefinir sua senha, acesse:\n{reset_url}\n\n"
            f"Se você não solicitou, ignore este e-mail."
        )
        return context

    def send(self, to):
        context = self.get_context_data()
        message = context["message"]

        send_mail(
            subject="Redefinição de senha",
            message=message,
            from_email=self.from_email or "gla2@cesar.school",
            recipient_list=to,
            fail_silently=False,
        )