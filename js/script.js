document.addEventListener('DOMContentLoaded', () => {
    const listaUsuarios = document.getElementById('listaUsuarios');
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    // Con esta función obtengo los usuarios de la API
    async function obtenerUsuarios() {
        try {
            const respuesta = await fetch(apiUrl);
            if (!respuesta.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const usuarios = await respuesta.json();
            const usuariosConDatosExtras = agregarDatosExtras(usuarios);
            mostrarUsuarios(usuariosConDatosExtras);
        } catch (error) {
            console.error('Hubo un problema con la petición Fetch:', error);
            listaUsuarios.innerHTML = '<li>Hubo un problema al cargar los usuarios</li>';
        }
    }

    // Con esta función agrego edad aleatoria, imagen y dirección a cada usuario
    function agregarDatosExtras(usuarios) {
        return usuarios.map(usuario => {
            const age = Math.floor(Math.random() * 50) + 20; // Edad aleatoria entre 20 y 70
            const img = `./assets/img/${usuario.id}.jpeg`;
            const address = `${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}`;
            
            return {
                ...usuario,
                age,
                img,
                address
            };
        });
    }

    // Aquí muestro los usuarios en la lista
    function mostrarUsuarios(usuarios) {
        usuarios.forEach(({ name, age, username, img, phone, email, company, address }) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${img}" alt="${name}">
                <div class="user-details">
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Edad:</strong> ${age}</p>
                    <p><strong>Username:</strong> ${username}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                </div>
                <div class="user-extra">
                    <p><strong>Compañía:</strong> ${company.name}</p>
                    <p><strong>Dirección:</strong> ${address}</p>
                </div>
            `;
            listaUsuarios.appendChild(li);
        });
    }

    // Llamo a la función para obtener los usuarios
    obtenerUsuarios();
});





