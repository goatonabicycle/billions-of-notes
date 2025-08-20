import { useCallback, useRef } from 'react';
import { useStorage } from './useLocalStorage';

export function useInputStateWithTracking(initialState, setStateModified, setLoadedFromKeep) {
	const [state, _setState] = useStorage("inputState", initialState);
	const stateRef = useRef(state);
	stateRef.current = state;

	const setState = useCallback((newState) => {
		const prevState = stateRef.current;
		const actualNewState = typeof newState === 'function' ? newState(prevState) : newState;
		
		const hasChanged = 
			prevState.key !== actualNewState.key ||
			prevState.scale !== actualNewState.scale ||
			prevState.numberOfNotes !== actualNewState.numberOfNotes ||
			prevState.emptyNotes !== actualNewState.emptyNotes ||
			prevState.octaves !== actualNewState.octaves;
		
		if (hasChanged) {
			setStateModified(true);
			setLoadedFromKeep(false);
		}
		
		_setState(actualNewState);
	}, [_setState, setStateModified, setLoadedFromKeep]);

	return [state, setState];
}

export function useControlStateWithTracking(initialState, setStateModified, setLoadedFromKeep) {
	const [state, _setState] = useStorage("controlState", initialState);
	const stateRef = useRef(state);
	stateRef.current = state;

	const setState = useCallback((newState) => {
		const prevState = stateRef.current;
		const actualNewState = typeof newState === 'function' ? newState(prevState) : newState;
		
		const hasChanged = 
			prevState.tempo !== actualNewState.tempo ||
			prevState.volume !== actualNewState.volume ||
			prevState.noteMode !== actualNewState.noteMode ||
			prevState.noteLength !== actualNewState.noteLength ||
			prevState.instrument !== actualNewState.instrument ||
			prevState.tieTogether !== actualNewState.tieTogether;
		
		if (hasChanged) {
			setStateModified(true);
			setLoadedFromKeep(false);
		}
		
		_setState(actualNewState);
	}, [_setState, setStateModified, setLoadedFromKeep]);

	return [state, setState];
}