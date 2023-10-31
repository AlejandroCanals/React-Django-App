from rest_framework import serializers
from .models import Task

#Los serializados conviertes tipos de datos de python a json

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'description', 'done')
        #fields = '__all__' para serializar todos los campos 
        model = Task

