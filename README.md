# App Info Sostenibilidad (app-tfg-sostenibilidad)

Mostrar características de sostenibilidad de los productos

## Instalar las dependencias
```bash
npm install
```

### Iniciar la app modo desarrollo (hot-code reloading, mostrar errores, etc.)
```bash
quasar dev
```

### Construir para android

#### Añadir soporte android
```bash
cd src-cordova

npm install

cordova platform add android

cordova plugin add cordova-plugin-android-permissions

cordova plugin add cordova-plugin-geolocation

cordova plugin add phonegap-plugin-barcodescanner
```

#### Generar APK

```bash
npm run build_android
```

#### Firmar APK
Utiliza el keystore en "~/TFG/jldm_tfg.keystore"
```bash
npm run sign_android
```

### Contar líneas de código
```bash
npm run locs
```

### Lint de los ficheros
```bash
npm run lint
```

### Construir la app para producción
```bash
quasar build
```

### Personalizar la configuración
Ver [Configurando quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
