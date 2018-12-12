from .models import Im, Alg
from rest_framework import serializers
from django.utils import timezone
from zlib import crc32


class ImSerializer(serializers.HyperlinkedModelSerializer):
    # alg = serializers.PrimaryKeyRelatedField(queryset=Alg.objects.all())

    class Meta:
        model = Im
        fields = ('subs_id', 'alg', 'prio', 'start_at', 'debug_level', 'trace_id', 'body', )
        # fields = ('url', 'username', 'email', 'groups')
        # exclude = ('deleted_at', )
        # read_only_fields = ('id', 'created_at', 'updated_at', )

    def create(self, validated_data):
        if not validated_data.get('start_at'):
            validated_data['start_at'] = timezone.now()
        validated_data['q'] = self._calculate_q(validated_data['subs_id'], validated_data['alg'])
        x = Im.objects.create(**validated_data)
        return x

    def _calculate_q(self, subs_id, alg):
        return 256 if subs_id in (7, 14, 900) else (subs_id + crc32(bytes(str(alg)[:3], 'utf-8'))) % 256
    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.content = validated_data.get('content', instance.content)
    #     instance.created = validated_data.get('created', instance.created)
    #     return instance

    # def save(self, **kwargs):
        # data = dict(self.initial_data.copy())
        # subs_id = data.pop('subs_id')[0]
        # value = redis.get(subs_id)
        # if value:
        #     value = json.loads(value)
        #     print()
        #     value['items'].append(data)
        # else:
        #     value = {'items': [data]}
        # redis.set(subs_id, json.dumps(value))
        # super().save(**kwargs)
