const { server } = require('./server.js');
let { publications } = require('./server.js');
let id = 0

/** ----------------------- Ejercicio 1 ----------------------- */
server.post("/posts", (req, res) => {
    const { author, title, contents } = req.body

    if (author && title && contents){
        const newPost = {
            ...req.body,
            id: ++id
        }
        
        publications.push(newPost)
        return res.status(200).send(publications)
    }
    
    else return res.status(404).send({ error: "No se recibieron los parámetros necesarios para crear la publicación" })
});

/** ----------------------- Ejercicio 2 ----------------------- */
server.get("/posts", (req, res) => {
    const { author, title } = req.query

    const resoults = [...publications].filter(e => e.author === author && e.title === title)

    return (resoults.length)
        ? res.status(200).send(resoults)
        : res.status(404).send({ error: "No existe ninguna publicación con dicho título y autor indicado" })
});

/** ----------------------- Ejercicio 3 ----------------------- */
server.get("/posts/:author", (req, res) => {
    const { author } = req.params

    const resoults = [...publications].filter(e => e.author === author)

    return (resoults.length)
        ? res.status(200).send(resoults)
        : res.status(404).send({ error: "No existe ninguna publicación del autor indicado" })
});

/** ----------------------- Ejercicio 4 ----------------------- */
server.put("/posts/:id", (req, res) => {
    const { id } = req.params,
    { title, contents } = req.body

    if (id && title && contents){
        if (publications.some(e => e.id == id)){
            publications = publications.map(e => {
                return (e.id == id)
                    ? {
                        ...e,
                        title: title,
                        contents: contents
                    }
                    : e
            })

            return res.status(200).send(publications)
        }
        else return res.status(404).send({error: "No se recibió el id correcto necesario para modificar la publicación"})
    }
    else return res.status(404).send({ error: "No se recibieron los parámetros necesarios para modificar la publicación" })
});

/** ----------------------- Ejercicio 5 ----------------------- */
server.delete("/posts/:id", (req, res) => {
    const { id } = req.params

    if (id){
        if (publications.some(e => e.id == id)){
            publications = publications.filter(e => e.id !== id)

            return res.status(200).send({ success: true })
        }
        else return res.status(404).send({ error: "No se recibió el id correcto necesario para eliminar la publicación" })
    }
    else return res.status(404).send({ error: "No se recibió el id de la publicación a eliminar" })
});

server.listen(3001);