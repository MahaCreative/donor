import { Inertia } from '@inertiajs/inertia'
import Log from 'laravel-mix/src/Log';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react'
import Input from '../../../Components/Input'
 import CreateRegistrasi from '../../Backend/Registrasi/CreateRegitstrasi'
export default function Proses() {
  const [data, setData] = useState({ search: '' });
  
  return (
      <div>
          <div className='relative'>
              <div>
                <CreateRegistrasi></CreateRegistrasi>
              </div>
              <div>
                  
              </div>
          </div>
    </div>
  )
}
