const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

exports.sendNotificationOnWrite = functions.firestore
    .document('actors/{actorId}')
    .onWrite((change, context) => {
        // Comprueba si el documento ha sido modificado
        if (!change.after.exists) {
            return null;
        }

        const actor = change.after.data();
        const payload = {
            notification: {
                title: 'Un actor ha sido modificado o creado',
                body: `El actor ${actor.nombre} ha sido ${change.before.exists ? 'modificado' : 'creado'}`,
            }
        };

        return admin.messaging().sendToTopic('actors', payload);
    });

exports.sendNotificationOnUpdate = functions.firestore
    .document('actors/{actorId}')
    .onUpdate((change, context) => {
        const actor = change.after.data();
        const payload = {
            notification: {
                title: 'Un actor ha sido actualizado',
                body: `El actor ${actor.nombre} ha sido actualizado`,
            }
        };

        return admin.messaging().sendToTopic('actors', payload);
    });


exports.sendNotificationOnDelete = functions.firestore
    .document('actors/{actorId}')
    .onDelete((snapshot, context) => {
        const actor = snapshot.data();
        const payload = {
            notification: {
                title: 'Un actor ha sido eliminado',
                body: `El actor ${actor.nombre} ha sido eliminado`,
            }
        };

        return admin.messaging().sendToTopic('actors', payload);
    });

exports.subscribeToTopic = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(400).send('Request must be POST');
        }

        // Asegúrate de validar y sanear tus datos de entrada
        const token = req.body.token;
        const topic = req.body.topic;

        // Regresa una promesa
        admin.messaging().subscribeToTopic(token, topic)
            .then(response => res.status(200).send(response))
            .catch(error => {
                console.error('Error subscribing to topic:', error);
                res.status(500).send('Error subscribing to topic');
            });
    });
});
