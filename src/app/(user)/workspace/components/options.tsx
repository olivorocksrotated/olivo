export default function Options() {
    const options = [
        'Transform into a task',
        'Transform into a commitment',
        'Transform into feedback'
    ];

    return (
        <>
            {options.map((option) => (
                <button type="button" key={option} className="p-2">
                    {option}
                </button>
            ))}
        </>
    );
}
