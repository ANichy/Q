import requests
from RabbitMq import RabbitMq
def mod(a, b):
    return a % b

def mod_test(a, b):
    if not (isinstance(a, int) and isinstance(b, int)):
        raise ValueError('mod_test')
    return mod(a, b)

def add_string(comment):
    return comment

def add_string_test(comment):
    if not isinstance(comment, str):
        raise ValueError('add_string_test')
    return comment


def add(a, b):
    return a + b

def add_test(a, b):
    if not (isinstance(a, int) and isinstance(b, int)):
        raise ValueError('mod_test')
    return add(a, b)

def div(a, b):
    return a / b

def div_test(a, b):
    if not (isinstance(a, int) and isinstance(b, int)):
        raise ValueError('div_test')
    return div(a, b)


def rest(url, body, type, def_code):
    requests.get('http://localhost:8001/rest_mock_count')
    if url == 'default_mock':
         if type == 'GET': code_response = 200
         elif type == 'PUT': code_response = 201
         elif type == 'DEL': code_response = 204
         r_response = 'все ок'

    if code_response == def_code:return r_response
    else: return 'ошибка проверки ответа'


def rest_test(url, body, type, def_code):
    if not (isinstance(url, str) and isinstance(body, list)
            and isinstance(type, str)and isinstance(def_code, int)):
        raise ValueError('rest_test')
    if url == 'default_mock':
         if type == 'GET': code_response = 200
         elif type == 'PUT': code_response = 201
         elif type == 'DEL': code_response = 204
         r_response = 'все ок'

    if code_response == def_code:return r_response
    else: return 'ошибка проверки ответа'


def rabbit(msg):
    rabbit = RabbitMq()
    rabbit.create_rabbitmq_connection(host='localhost', http_port=8080, amqp_port=5000, username='user', password='password', alias='rabbit', vhost='/')
    rabbit.publish_message(exchange_name='message', routing_key='example.text', payload=msg)
    rabbit.disconnect_from_rabbitmq()
    requests.get('http://localhost:8001/rest_mock_count')

def rabbit_test(msg):
    if not (msg and isinstance(msg, str)):
        raise ValueError('rabbit_test')

commands = {
    'mod': mod,
    'add': add,
    'add_string': add_string,
    'div': div,
    'rest': rest,
    'rabbit': rabbit,
}

commands_test = {
    'mod': mod_test,
    'add': add_test,
    'add_string': add_string_test,
    'div': div_test,
    'rest': rest_test,
    'rabbit': rabbit_test,
}
