import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useCsvData, useIsLoading } from '../redux/reducers/ExpLogReducer';
import { fetchCsvData } from '../redux/sagas/experienceLog/fetchCsvSaga';
import { useDispatchEffect } from '../utils/hooks';

const headers = [
    { key: "id" , label: "id"  },
    { key: "expereince_type.name" , label: "expereince_type"  },
    { key: "setting.name" , label: "setting"  },
    { key: "method_of_supervision.name" , label: "method_of_supervision"  },
    { key: "client_observation.name" , label: "client_observation"  },
    { key: "supervision_contact.contact" , label: "supervision_contact"  },
    { key: "task.name" , label: "task"  },
    { key: "supervisor.name" , label: "supervisor"  },
    { key: "date_of_experience" , label: "date_of_experience"  },
    { key: "time_of_expereince" , label: "time_of_expereince"  },
    { key: "unrestricted_hours" , label: "unrestricted_hours"  },
    { key: "restricted_hours" , label: "restricted_hours"  },
    { key: "experience_hours" , label: "experience_hours"  },
    { key: "individual_or_group" , label: "individual_or_group"  },
    { key: "supervision_start_time" , label: "supervision_start_time"  },
    { key: "supervision_end_time" , label: "supervision_end_time"  },
    { key: "supervised_hours" , label: "supervised_hours"  },
    { key: "independant_hours" , label: "independant_hours"  },
    { key: "experience_note" , label: "experience_note"  },
    { key: "status", label: "status" },
]

export default function CSVDownloadBtn() {

    const csvData = useCsvData();
    const isLoading = useIsLoading();
  
    useDispatchEffect(fetchCsvData, null, true);
    
    const [downloadLink, setDownloadLink] = useState('')

    // function for generating file and set download link
    const makeTextFile = () => {
      const data = new Blob([csvData], { type: 'text/plain' })
  
      if (downloadLink !== '') 
        window.URL.revokeObjectURL(downloadLink)

      setDownloadLink(window.URL.createObjectURL(data))
    }
  
    useEffect(() => {
      makeTextFile()
    }, [csvData])
  
  if(!isLoading)
  return (
    <a
        download={"Experience logs.csv"}
        className="button is-two-fifths is-rounded dashBtn mt30"
        href={downloadLink}
    >
        {isLoading ? 'Loading ...' : 'Download CSV'}
    </a>
  )
  else return null;
}
