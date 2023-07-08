import React, { useState, useEffect } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api?results=30');
      const data = await response.json();
      console.log('hyyy data', data);
      setUsers(data.results);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getColumnValue = (object, column) => {
    const keys = column.split('.');
    console.log('keys',keys)
    let value = object
    keys.forEach((key) => {
      value = value[key];

    });
   // console.log(value,'--------->')
    return value;
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.first.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.login.username.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setSearchKeyword('');
    fetchUsers();
  };

  const sortedUsers = users.sort((a, b) => {
    const columnA = getColumnValue(a, sortColumn);
    const columnB = getColumnValue(b, sortColumn);
    if (columnA < columnB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return false;
  });

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  return (
    <div>{users?(
        <>
    
      <div className="mb-2">
        <input
          type="text"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="Search users"
          className="form-control mr-2"
        />
        <button onClick={handleSearch} className="btn btn-primary mr-2">
          Search
        </button>
        <button onClick={handleReset} className="btn btn-secondary">
          Reset
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => handleSort('name')}>
              Name {getSortIcon('name')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {getSortIcon('email')}
            </th>
            <th onClick={() => handleSort('login.username')}>
              Username {getSortIcon('login.username')}
            </th>
            <th onClick={() => handleSort('location.city')}>
              City {getSortIcon('location.city')}
            </th>
            <th onClick={() => handleSort('location.state')}>
              State {getSortIcon('location.state')}
            </th>
            <th onClick={() => handleSort('location.postcode')}>
              Postcode {getSortIcon('location.postcode')}
            </th>
            <th onClick={() => handleSort('location.country')}>
              Country {getSortIcon('location.country')}
            </th>
            <th onClick={() => handleSort('location.coordinates.latitude')}>
              Latitude {getSortIcon('location.coordinates.latitude')}
            </th>
            <th onClick={() => handleSort('location.coordinates.longitude')}>
              Longitude {getSortIcon('location.coordinates.longitude')}
            </th>
            <th>Profile Photo</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index}>
              <td>
                {user.name.first} {user.name.last}
              </td>
              <td>{user.email}</td>
              <td>{user.login.username}</td>
              <td>{user.location.city}</td>
              <td>{user.location.state}</td>
              <td>{user.location.postcode}</td>
              <td>{user.location.country}</td>
              <td>{user.location.coordinates.latitude}</td>
              <td>{user.location.coordinates.longitude}</td>
              <td>
                <img src={user.picture.thumbnail} alt="Profile" className="img-thumbnail" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          
      </>
    ):'Loading....'}
    </div>
  );
};

export default UserTable;
