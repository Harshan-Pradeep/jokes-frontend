interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    return (
        <div className="flex justify-between items-center mt-8 p-4 bg-gray-900 rounded-lg shadow-lg">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`py-2 px-4 rounded-lg font-bold ${currentPage === 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out'
                    }`}
            >
                Previous
            </button>
            <span className="text-white font-semibold">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`py-2 px-4 rounded-lg font-bold ${currentPage === totalPages
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out'
                    }`}
            >
                Next
            </button>
        </div>
    );
};
