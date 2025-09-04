export default function NameInput({ value, error, onClick }) {
    return (
        <div className="relative" onClick={onClick}>
            <input
                type="text"
                value={value || ''}
                readOnly
                className={`w-full h-[50px] px-4 rounded-lg border text-lg 
                           ${error ? 'border-red-500' : 'border-gray-20'} 
                           bg-white text-gray-90`}
            />
        </div>
    );
}