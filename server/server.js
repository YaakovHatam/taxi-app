const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3300;
app.use(cors());

app.get('/:source/:dest', function (req, res) {
    const { source, dest } = req.params;
    console.log(source, dest);

    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${source}&destinations=${dest}&key=`).then(gRes => {
        gRes.json().then(gjRes => {
            res.json(gjRes);
        })
    });
});




app.listen(PORT, () => {
    console.log('server on', PORT)
});
