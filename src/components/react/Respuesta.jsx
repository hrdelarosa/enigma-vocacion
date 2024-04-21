export default function Respuesta({ respuesta, value } ) {
    return (
        <li>
            <input
                type="radio"
                id={`value-${value}`}
                name="value-radio"
                value={value}
            />
            <label for={`value-${value}`}>{respuesta}</label>
        </li>
    )
}