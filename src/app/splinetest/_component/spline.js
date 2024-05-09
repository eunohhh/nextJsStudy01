"use client"
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './Scene'

export default function SplinetestComp () {

    return(
        <Suspense fallback={null}>
            <div style={{height: '100vh', width: '100vw', margin: "0px"}}>
                <Canvas shadows flat linear>
                    <Scene />
                    <OrbitControls enableZoom={true}/>
                </Canvas>
            </div>
        </Suspense>
    )
}