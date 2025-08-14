"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function AuroraBackground() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    canvasRef.current.appendChild(renderer.domElement)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 3

        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p){
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            
            float res = mix(
                mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
            return res*res;
        }

        float fbm(vec2 x) {
            float v = 0.0;
            float a = 0.3;
            vec2 shift = vec2(100);    
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < NUM_OCTAVES; ++i) {
                v += a * noise(x);
                x = rot * x * 2.0 + shift;
                a *= 0.4;
            }
            return v;
        }

        void main() {
            vec2 shake = vec2(sin(iTime * 0.8) * 0.003, cos(iTime * 1.2) * 0.003);
            
            vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
            vec2 v;
            vec4 o = vec4(0.0);
            
            float f = 2.0 + fbm(p + vec2(iTime * 3.0, 0.0)) * 0.4; 
            
            for(float i = 0.0; i++ < 40.0;)
            {
                v = p + cos(i * i + (iTime + p.x * 0.06) * 0.02 + i * vec2(13.0, 11.0)) * 4.0;
                
                vec4 auroraColors = vec4(
                    0.4 + 0.2 * sin(i * 0.15 + iTime * 0.3),
                    0.2 + 0.4 * cos(i * 0.25 + iTime * 0.4),
                    0.8 + 0.2 * sin(i * 0.35 + iTime * 0.2),
                    1.0
                );
                
                vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.6)) / length(max(v, vec2(v.x * f * 0.012, v.y * 1.8)));
                
                o += currentContribution * 0.8;
            }
            
            o = tanh(pow(o / 120.0, vec4(1.4)));
            gl_FragColor = o * 1.2;
        }
      `,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let animationFrameId: number

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      material.uniforms.iTime.value += 0.012
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={canvasRef} className="fixed top-0 left-0 -z-10 w-full h-full" />
}
