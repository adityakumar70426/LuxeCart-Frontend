import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../context/data/MyContext';
import { CiSearch } from 'react-icons/ci';

const Filter = () => {
    const context = useContext(MyContext);
    const [inputValue, setInputValue] = useState('');

    const { mode, setSearchkey, setFilterType, setFilterPrice } = context;

    const categories = ['Food', 'Electronics', 'Clothing', 'Books', 'Beauty'];

    useEffect(() => {
        const handler = setTimeout(() => {
          setSearchkey(inputValue);
        }, 300); // debounce delay
      
        return () => {
          clearTimeout(handler); // clear previous timer on input change
        };
      }, [inputValue]);

    return (
        <div>
            <div className="container mx-auto px-4 mt-5">
                <div
                    className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
                    style={{
                        backgroundColor: mode === 'dark' ? '#282c34' : '',
                        color: mode === 'dark' ? 'white' : '',
                    }}
                >
                    <div className="relative">
                        <div className="absolute flex items-center ml-2 h-full">
                            <CiSearch size={18} />
                        </div>
                        <input
                            type="text"
                            name="searchkey"
                            id="searchkey"
                            placeholder="Search here"
                            onChange={(e) => setInputValue(e.target.value)}
                            className="px-8 py-3 w-full rounded-md bg-violet-0 outline-0 text-sm"
                            style={{
                                backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
                                color: mode === 'dark' ? 'white' : '',
                            }}
                        />

                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="font-medium">Filters</p>
                        <button
                            onClick={() => {
                                setSearchkey('');
                                setFilterType('');
                                setFilterPrice('');
                            }}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                            style={{ color: mode === 'dark' ? 'black' : '' }}
                        >
                            Reset Filter
                        </button>
                    </div>
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                            <select
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                style={{
                                    backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
                                    color: mode === 'dark' ? 'white' : '',
                                }}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <select
                                onChange={(e) => setFilterPrice(e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                style={{
                                    backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
                                    color: mode === 'dark' ? 'white' : '',
                                }}
                            >
                                <option value="">Select Maximum Price</option>
                                <option value="100">100</option>
                                <option value="1000">1000</option>
                                <option value="10000">10000</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
