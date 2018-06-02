# README
-------------------------------

O fwiotfurb é um framework para Ionic 2+ que visa facilitar a comunicação com dispositivos para IoT, possuindo interfaces de comunicação como bluetooth e mqtt.

## Pré-requisitos

* Possuir o node.js instalado
* Conhecimento básico de Ionic 2+
* Android SDK (caso utilize android)

## Preparação rápida de um projeto

1. Caso não possua o Ionic e Cordova instalados, instalar globalmente
>`npm install -g ionic cordova`
2. Iniciar um novo projeto Ionic
>`ionic start MeuAPPIot blank`
3. Navegar para a pasta do projeto
>`cd MeuAPPIot`
4. Adicionar o plugin bluetooth do Cordova
>`ionic cordova plugin add cordova-plugin-bluetooth-serial`
5. Adicionar o pacote bluetooth do Cordova
>`npm install --save @ionic-native/bluetooth-serial`
6. Instalar o pacote fwiotfurb
>`npm install fwiotfurb`

# Importar os providers

Tanto para o ambiente Mqtt quanto Bluetooth, é necessário importar os seus providers no app.module.ts

```
:::typescript
	import { FwMqttProvider, FwBluetoothProvider } from 'fwiotfurb';
	import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

	...
	
	providers: [
		...
    	BluetoothSerial,
    	FwBluetoothProvider,
    	FwMqttProvider,
		...
  ]
```

# Ambiente MQTT
* * * 
Para informações sobre o que é e como funciona o MQTT: [Site oficial](http://mqtt.org/), [Artigo IBM](http://mqtt.org/).

Para a utilização do MQTT, é necessário um broker. Um broker gratuido disponibilizado na web é o [CloudMQTT](https://www.cloudmqtt.com/).

Para criação de conta e de uma instância no CloudMQTT, acessar o [tutorial no youtube](https://youtu.be/HTaK9cUQ5kw)

## Utilização do MQTT

Para utilizar o MQTT, é necessário importar os módulos *FwMqttProvider*, *ConfiguracaoMQTT* e *Paho*, além de injetar o provedor MQTT do framework.

```
:::typescript

	import { FwMqttProvider, ConfiguracaoMQTT } from 'fwiotfurb';
	import { Paho } from 'ng2-mqtt/mqttws31';
	
	...

	export class HomePage {

  	constructor
    	(
      	public navCtrl: NavController,
      	public fwMQTT: FwMqttProvider
    	) {}
		
	...
```

**Métodos:**

* [configurarMqtt()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-configurar-mqtt)
* [desconectar()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-desconectar)
* [clienteConectado()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-cliente-conectado)
* [publicar()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-publicar)
* [inscrever()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-inscrever)
* [desinscrever()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-desinscrever)

### configurarMqtt()

Este método faz a configuração e conecta em um broker MQTT.
```
:::typescript
    let configuracao: ConfiguracaoMQTT = {
      hostname: 'hostname.cloudmqtt.com',
      porta: 99999, // Obs: deve ser a porta Websocket
      idCliente: '123',
      configuracaoAutenticacao: {
        usuario: "usuario",
        senha: "senha"
      }
    };

    this.fwComunicacao.fwMQTT.configurarMQTT(configuracao);
```

### desconectar()

Se desconecta de um broker MQTT.
```
:::typescript
	this.fwMQTT.desconectar();
```

### clienteConectado()

Valida se existe um cliente conectado.
```
:::typescript
	this.fwMQTT.clienteConectado();
```

### publicar()

Publica uma mensagem em um tópico do broker conectado.
```
:::typescript
	this.fwMQTT.publicar('mensagem', '/topico/subtopico/etc');
```

### inscrever()

Se inscreve em um tópico do broker conectado.
```
:::typescript
	this.fwMQTT.inscrever('/topico')
```

### desinscrever()

Se desinscreve de um tópico.
```
:::typescript
	this.fwMQTT.desinscrever('/topico');
```

# Ambiente Bluetooth
* * *
Para utilização do bluetooth é necessário ter instalado previamente o SDK Android.

## Utilização Bluetooth

Para utilizar o bluetooth, é necessário importar os módulos *DispositivoBluetooth* e *FwBluetoothProvider*, além de injetar o provedor bluetooth do framework.

Além disso, também é necessário ativar o bluetooth do celular.

O exemplo a seguir ativa o bluetooth assim que a página for carregada.
```
:::typescript
	import { DispositivoBluetooth, FwBluetoothProvider } from 'fwiotfurb';

	...

	export class HomePage {

		constructor(
		    private fwBluetooth: FwBluetoothProvider,
		    private platform: Platform
	  	) {
		    this.platform.ready().then(() => fwBluetooth.ativarBluetooth());
  		}
	...
```

**Métodos:**

* [ativarBluetooth()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-ativar-bluetooth)
* [dispositivoConectado()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-dispositivo-conectado)
* [conectarDispositivo()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-conectar-dispositivo)
* [enviarMensagem()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-enviar-mensagem)
* [conectaEnviaMensagemDispositivo()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-conecta-enviaMensagem-dispositivo)
* [listarDispositivosPareados()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-listar-dispositivos-pareados)
* [listarDispositivosNaoPareados()](https://bitbucket.org/gcgfurb/rodrigoorthmannnielson/overview#markdown-header-listar-dispositivos-nao-pareados)

### ativarBluetooth()

Ativa o bluetooh do celular.
```
:::typescript
	fwBluetooth.ativarBluetooth();
```

### dispositivoConectado()

Valida se existe algum dispositivo conectado.
```
:::typescript
	this.fwBluetooth.dispositivoConectado()
    	.then((conectado) => console.log('Dispositivo conectado'))
    	.catch((desconectado) => console.log('Dispositivo desconectado'));
```
### conectarDispositivo()

Conecta em um dispositivo a partir do seu endereço MAC.
```
:::typescript
	this.fwBluetooth.conectarDispositivo('enderecoMAC');
```
### enviarMensagem()

Envia uma mensagem pro dispositivo conectado.
```
:::typescript
	this.fwBluetooth.enviarMensagem('mensagem');
```
### conectaEnviaMensagemDispositivo()

Conecta em um dispositivo e envia uma mensagem.
```
:::typescript
	this.fwBluetooth.conectaEnviaMensagemDispositivo("mensagem", 'enderecoMac');
```
### listarDispositivosPareados()

Lista os dispositivos pareados com o celular.
```
:::typescript
		let listaDispositivosPareados: Array<DispositivoBluetooth> = new Array<DispositivoBluetooth>();
	
	    this.fwBluetooth.listarDispositivosPareados()
	      .then((dispositivos) => {
	        listaDispositivosPareados = dispositivos;
      	});
```
### listarDispositivosNaoPareados

Lista os dispositivos não pareados com o celular.
```
:::typescript
	let listaDispositivosNaoPareados:  Array<DispositivoBluetooth> = new Array<DispositivoBluetooth>();
	
    	this.fwComunicacao.fwBluetooth.listarDispositivosNaoPareados()
      	.then((dispositivos) => listaDispositivosNaoPareados = dispositivos);
```

# Estruturas adicionais
* * * 
Além dos métodos de comunicação, o framework também objetos para facilitar o uso do framework.

### Dispositivo

É a estrutura de um dispositivo genérico, sem especificação do seu tipo de comunicação, possui as propriedades:

```
:::typescript
        public Id: string,
        public Nome: string, // Nome do dispositivo
        public ComandoDispositivo: ComandoDispositivo, // Comando que o dispositivo utiliza
        public Estado: string, // Estado atual do dispositivo
        public TipoDispositivo: string // Dipo do dispositivo
```

### DispositivoMQTT

Herda Dispositivo. Possui as configurações necessárias para comunicação via MQTT.

```
:::typescript
        public Id: string,
        public Nome: string,
        public ComandoDispositivo: ComandoDispositivo,
        public Estado: string,
        public TipoDispositivo: string, // deve ser DispositivoMQTT
        public TopicoPublicacao: string, // Tópico em que irá publicar
        public TopicoInscricao: string, // Tópico em que irá se inscrever
        public Configuracao: ConfiguracaoMQTT // Configuração MQTT
```


### DispositivoBluetooth

Herda dispositivo. Possui o endereço MAC do dispositivo bluetooth.

```
:::typescript
        public Id: string,
        public Nome: string,
        public ComandoDispositivo: ComandoDispositivo,
        public Estado: string,
        public TipoDispositivo: string, // deve ser DispositivoBluetooth
        public EnderecoMAC: string // endereço MAC
```

### ComandoDispositivo

Classe genérica que contém as informações sobre os comandos que o dispositivo pode enviar. Só possui uma propriedade que é o TipoComando.

```
:::typescript
        public TipoComando: string
```

### ComandoONOFF

Herda ComandoDispositivo. Classe utilizada por dispositivos que possuem apenas dois comandos, ON e OFF, que tem a funcionalidade de interruptor.

```
:::typescript
        public TipoComando: string, // Deve ser ComandoONOFF
        public ON: string, // Comando para ligar
        public OFF: string // Comando para desligar
```

### Comodo

Estrutura de um cômodo de uma casa. Utilizado apenas para subdividir os dispositivos.

```
:::typescript
        public Id: string,
        public Nome: string, // Nome do cômodo
        public Descricao: string, // Descrição
        public Dispositivos: Array<Dispositivo> // Lista de dispositivos pertencentes à este cômodo
```


### Casa

Estrutura de uma casa, agrega vários cômodos.

```
:::typescript
        public Id: string,
        public Nome: string, // Nome da casa
        public Descricao: string, // Descrição
        public Comodos: Array<Comodo> // Lista de cômodos da casa
```