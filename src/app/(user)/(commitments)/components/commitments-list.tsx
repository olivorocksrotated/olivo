export default function CommitmentsList() {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                                        Commitment
                        </th>
                        <th scope="col" className="px-6 py-3">
                                        By when
                        </th>
                        <th scope="col" className="px-6 py-3">
                                        Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Fake commitment 1
                        </th>
                        <td className="px-6 py-4">
                            Broken
                        </td>
                        <td className="px-6 py-4">
                            Today
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
