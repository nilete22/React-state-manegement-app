export const Button = ({ text, handler }) => {
return (
    <button onClick={handler}>{text}</button>
)};