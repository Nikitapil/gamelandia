import React, { FC, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCollectionData, useCollection  } from "react-firebase-hooks/firestore";
import '../styles/battleship.scss'
import { doc, collection, query, where, orderBy, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Firestore } from 'firebase/firestore'

interface BattleShipRoomsProps {
    firestore: Firestore
}
 
export const BattleShipRooms:FC<BattleShipRoomsProps> = ({firestore}) => {
    const [rooms, loading, error, snapshot] = useCollectionData(collection(firestore, 'battleship'))
    const createRoom = async () => {
        const newRoom = {
            player1: null,
            player2: null,
            isAvailable: true,
            id: `room_${(rooms?.length || 0) + 1}`,
            name: `Room ${(rooms?.length || 0) + 1}`
        } 
        setDoc(doc(firestore, 'battleship', newRoom.id), newRoom)
    }

    const filteredRooms = useMemo(() => {
        return rooms?.filter(room => !room.palyer1 || !room.player2)
    }, [rooms])

  return (
    <div className='container battlship-rooms__container'>
        <h2 className='page-title'>Choose room to play or create new</h2>
        <table className='battlship-rooms__table'>
            <thead>
                <tr>
                    <td><button onClick={createRoom}>Create room</button></td>
                </tr>
            </thead>
            <tbody>
                {filteredRooms?.map(room => (
                    <tr key={room.id}>
                    <td>
                        <Link to={`/battleship/${room.id}`} className='room-link'>Room 1</Link>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
