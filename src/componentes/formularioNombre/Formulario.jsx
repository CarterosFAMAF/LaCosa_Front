import {set, useForm} from 'react-hook-form'

const Formulario = ({setNombre}) => {
    const {register, formState: {errors}, handleSubmit} = useForm();

    const onSubmit = (data, e) => {
        console.log(data)
        e.target.reset();

        setNombre(data.Nombre)
    }

    return (
        <div>
            <h1>Ingrese su nombre de jugador</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nombre</label>
                    <input type="text" {...register('Nombre', {
                        required: true
                    })}/>
                    {errors.Nombre && <p>El campo Nombre es requerido</p>}
                </div>
                <input type="submit" value="Enviar"/>
            </form>
        </div>
    )
}

export default Formulario