import '../../index.css';

export default function MySelect( { label, options, value, onChange }) {
    return (
        <div className='flex flex-col gap-1 mb-4'>
            <div>{label}</div>
            <select value={value} onChange={(e) => onChange(e.target.value)} className={"my-select"}>
                {options.map(option => (
                    <option key={option.id} className='my-option' value={option.value}>{option.text}</option>
                ))}
            </select>
        </div>
    );
}