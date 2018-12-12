import yaml
from .commands import commands, commands_test


def mod(self, *args, **kwargs):
    pass


types = {
    'int': int,
    'str': str,
}

class Alg:

    FILENAMES = {
        1: 'mod.yaml',
        2: 'add_test.yaml',
        3: 'add_string.yaml',
        4: 'mod5steps.yaml',
        5: 'rest.yaml'
    }
    DIR = './alg/'

    def __init__(self):
        self.my_dict = None

    def load_file(self, file_name: str)->None:
        with open(self.DIR+file_name, 'r') as stream:
            try:
                self.my_dict = yaml.load(stream)
                return self.my_dict
            except yaml.YAMLError as exc:
                print(f'Bad algorithm: {file_name}')
                raise

    # @staticmethod
    # def get_elements_by_jsonpath(source_json, expr):
    #     if not isinstance(source_json, six.string_types):
    #         source_json = json_validator.json_to_string(source_json)
    #     elements = json_validator.get_elements(json_string=source_json, expr=expr)
    #     return [] if elements is None else elements[0]

    def validate(self):
        """Проверка на выполнимость - разрушающая. Не запускать при работе с данными"""
        if 'name' not in self.my_dict['algorithm']:
            raise NameError('not found field "name"')
        if 'steps' not in self.my_dict['algorithm']:
            raise NameError('not found field "steps"')
        params = self.my_dict['algorithm']['data'] if 'data' in self.my_dict['algorithm'] else {}

        for step in self.my_dict['algorithm']['steps']:
            self.validate_step(step['step'])
            self.run_step(step['step'], params, is_test=True)

    def validate_step(self, step):
        if 'params' in step:
            for param, value in step['params'].items():
                try:
                    self.my_dict['algorithm']['data'][value]
                except TypeError:
                    print(f'Bad data in algorithm: {value}')
                    raise

        if 'name' not in step:
            raise NameError(f'not found field "name" in {step}')
        if 'call' not in step:
            raise NameError(f'not found field "call" in {step["name"]}')
        if step['call'] not in commands:
            raise NameError(f'not found call {step["call"]} in step {step["name"]} in commands')
        if step['call'] not in commands_test:
            raise NameError(f'not found call {step["call"]} in step {step["name"]} in commands_test')
        if 'if' in step and step['if'] not in self.my_dict['algorithm']['data']:
            raise NameError(f'not found param {step["call"]} in step {step["name"]} for "if"')

        if 'except' in step:
            if set(step['except']) - {'retry', 'exit'}:
                raise ValueError(f'extra fields in except in step {step["name"]}. Step: {step["name"]}')
            if 'retry' in step['except']:
                if not isinstance(step['except']['retry'], int):
                    raise ValueError('field "retry" must be int. Step: {step["name"]}')
                if step['except']['retry'] not in range(0, 100):
                    raise ValueError('field "retry" must be in range(0, 100). Step: {step["name"]}')
            if 'exit' in step['except']:
                if not isinstance(step['except']['exit'], str):
                    raise ValueError('field "exit" must be str. Step: {step["name"]}')
                if step['except']['exit'] not in ('fail', 'skip', 'ignore'):
                    raise ValueError('''field "exit" must be in ('fail', 'skip', 'ignore'). Step: {step["name"]}''')

    def run(self, data):
        if 'validate' in self.my_dict:
            for key, value in self.my_dict['validate']:
                if value not in types:
                    raise ValueError('error')
                if key not in data or not isinstance(data[key], types[value]):
                    raise ValueError('error')

        params = self.my_dict['algorithm']['data'] if 'data' in self.my_dict['algorithm'] else {}
        params.update(data)
        for step in self.my_dict['algorithm']['steps']:
            self.run_step(step['step'], params, is_test=False)

    @staticmethod
    def run_step(step, params, is_test=False):
        if 'if' in step and not params[step['if']]:
            return
        params_for_func = step['const'] if 'const' in step else {}
        if 'params' in step:
            for param, value in step['params'].items():
                params_for_func[param] = params[value]
        try:
            command = commands_test[step['call']] if is_test else commands[step['call']]
            result = command(**params_for_func)
            if 'result' in step:
                params[step['result']] = result
        except Exception as e:
            print(e)
            if 'except' in step:
                if 'retry' in step:
                    if step['retry'] > 0:
                        step['retry'] -= 1
                        return Alg.run_step(step, params, is_test)
                if 'exit' in step:
                    if 'skip' == step['exit']:
                        return
                    raise ValueError(step['exit'])
            raise ValueError('ignore')
