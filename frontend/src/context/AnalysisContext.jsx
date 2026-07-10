import { createContext, useContext, useState } from "react";

const AnalysisContext = createContext(null);

export function AnalysisProvider({children}) {
    const [analysisResult, setAnalysisResult] = useState(null);

    function saveAnalysisResult(result){
        setAnalysisResult(result);
    }

    function clearAnalysisResult(){
        setAnalysisResult(null);
    }

    return(
        <AnalysisContext.Provider
            value = {{
                analysisResult,
                saveAnalysisResult,
                clearAnalysisResult
            }}
        >
        {children}
        </AnalysisContext.Provider>
    )
}

export function useAnalysis(){
    return useContext(AnalysisContext);
}