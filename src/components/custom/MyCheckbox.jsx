import '../../index.css';

export default function MyCheckbox({ text, onClick, value }) {
    return (
        <div className='flex flex-col gap-1 mt-2 '>
            <div className={'flex gap-2 cursor-pointer'}
                onClick={() => onClick(value)}>
                <span className={`my-checkbox ${value ? "bg-[#f1efe3]" : "bg-white"}`}></span>
                <span className='text-sm'>{text}</span>
            </div>
        </div>
    );
}