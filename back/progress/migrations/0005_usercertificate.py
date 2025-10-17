# Generated manually for UserCertificate model

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_customuser_managers_alter_customuser_email_and_more'),
        ('progress', '0004_merge_20251013_1518'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserCertificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('program', models.CharField(choices=[('PROIND', 'PROIND'), ('PRODEPE', 'PRODEPE'), ('PRODEAUTO', 'PRODEAUTO')], max_length=10)),
                ('track', models.CharField(max_length=100)),
                ('certificate_id', models.CharField(max_length=50, unique=True)),
                ('certificate_name', models.CharField(max_length=200)),
                ('certificate_description', models.TextField(blank=True, null=True)),
                ('score', models.DecimalField(decimal_places=2, max_digits=5)),
                ('correct_answers', models.PositiveIntegerField()),
                ('total_questions', models.PositiveIntegerField()),
                ('answers', models.JSONField(blank=True, default=list)),
                ('earned_at', models.DateTimeField(auto_now_add=True)),
                ('expires_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_verified', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_certificates', to='users.customuser')),
            ],
            options={
                'verbose_name': 'Certificação do Usuário',
                'verbose_name_plural': 'Certificações dos Usuários',
                'ordering': ['-earned_at'],
            },
        ),
        migrations.AddIndex(
            model_name='usercertificate',
            index=models.Index(fields=['user', 'earned_at'], name='progress_use_user_id_2a8b8a_idx'),
        ),
        migrations.AddIndex(
            model_name='usercertificate',
            index=models.Index(fields=['program', 'track'], name='progress_use_program_2a8b8a_idx'),
        ),
        migrations.AddIndex(
            model_name='usercertificate',
            index=models.Index(fields=['certificate_id'], name='progress_use_certifi_2a8b8a_idx'),
        ),
        migrations.AddIndex(
            model_name='usercertificate',
            index=models.Index(fields=['is_active', 'is_verified'], name='progress_use_is_acti_2a8b8a_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='usercertificate',
            unique_together={('user', 'program', 'track')},
        ),
    ]
