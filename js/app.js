function n(id){ return Number(document.getElementById(id).value); }
function f(x,d=8){ return Number(x).toFixed(d); }
function pct(x){ return f(x,6) + " %"; }
function errBox(msg){ return `<p><b>Revisa los datos:</b> ${msg}</p>`; }

function resolver1(){
  const xa=n("e1xa"), xv=n("e1xv");
  if(!Number.isFinite(xa)||!Number.isFinite(xv)||xv===0||xv<0) {
    document.getElementById("r1").innerHTML=errBox("xv debe ser distinto de 0 y positivo."); return;
  }
  const Ea=Math.abs(xv-xa);
  const Er=Ea/Math.abs(xv)*100;
  const A=xv*xv;
  const dA=Math.abs(2*xv)*Ea;
  const ErA=dA/Math.abs(A)*100;
  document.getElementById("r1").innerHTML=`
    <h3>Respuesta</h3>
    <div class="step"><b>a) Error absoluto:</b> Ea = |${f(xv)} − ${f(xa)}| = <b>${f(Ea)} cm</b>.</div>
    <div class="step"><b>b) Error relativo porcentual:</b> Er = (${f(Ea)} / ${f(Math.abs(xv))}) × 100 = <b>${pct(Er)}</b>.</div>
    <div class="step"><b>c) Propagación al área:</b> A = x², A′(x) = 2x. Entonces ΔA ≈ |2(${f(xv)})|(${f(Ea)}) = <b>${f(dA)} cm²</b>.</div>
    <div class="step"><b>d) Error relativo porcentual del área:</b> Er(A) = (${f(dA)} / ${f(A)}) × 100 = <b>${pct(ErA)}</b>.</div>
    <div class="step"><b>Interpretación:</b> la incertidumbre del lado se traduce en una incertidumbre aproximada mayor en el área porque A depende cuadráticamente de x.</div>`;
}

function resolver2(){
  const x=n("e2x"), a=n("e2a");
  if(!Number.isFinite(x)||!Number.isFinite(a)) {document.getElementById("r2").innerHTML=errBox("usa valores numéricos.");return;}
  const h=x-a;
  const p1=Math.exp(a)*(1+h);
  const p2=Math.exp(a)*(1+h+h*h/2);
  const real=Math.exp(x);
  const e1=Math.abs(real-p1), e2=Math.abs(real-p2);
  const er1=e1/Math.abs(real)*100, er2=e2/Math.abs(real)*100;
  const bound=Math.exp(Math.max(a,x))*Math.abs(h)**3/6;
  document.getElementById("r2").innerHTML=`
    <h3>Respuesta</h3>
    <div class="step"><b>a) Taylor grado 1:</b> P₁(x) = eᵃ[1 + (x−a)].<br>
    <b>Taylor grado 2:</b> P₂(x) = eᵃ[1 + (x−a) + (x−a)²/2].</div>
    <div class="step"><b>b) Aproximaciones para x = ${f(x)}:</b>
      P₁(${f(x)}) = <b>${f(p1)}</b>;
      P₂(${f(x)}) = <b>${f(p2)}</b>.
    </div>
    <div class="step"><b>c) Valor real:</b> eˣ = <b>${f(real)}</b>.<br>
      Error absoluto P₁: <b>${f(e1)}</b>; error relativo: <b>${pct(er1)}</b>.<br>
      Error absoluto P₂: <b>${f(e2)}</b>; error relativo: <b>${pct(er2)}</b>.
    </div>
    <div class="step"><b>d) Cota del residuo de Lagrange para P₂:</b>
      |R₂(x)| ≤ eˣ |x−a|³ / 3! = <b>${f(bound)}</b>.
      <br>Comparación: el error absoluto real de P₂ es <b>${f(e2)}</b>, por lo que se cumple la cota.
    </div>
    <div class="step"><b>Interpretación:</b> al aumentar de grado 1 a grado 2, la aproximación mejora para este caso, reduciendo el error de truncamiento.</div>`;
}

function resolver3(){
  const L=n("e3L"), dL=n("e3dL"), T=n("e3T"), dT=n("e3dT"), greal=n("e3greal");
  if([L,dL,T,dT,greal].some(v=>!Number.isFinite(v))||L<=0||T<=0||dL<0||dT<0||greal===0){
    document.getElementById("r3").innerHTML=errBox("L y T deben ser positivos; las incertidumbres no pueden ser negativas."); return;
  }
  const C=4*Math.PI**2;
  const g=C*L/(T*T);
  const Ea=Math.abs(g-greal);
  const Er=Ea/Math.abs(greal)*100;
  const dgL=Math.abs(C/(T*T))*dL;
  const dgT=Math.abs(-2*C*L/(T**3))*dT;
  const dg=dgL+dgT;
  const ErProp=dg/Math.abs(g)*100;
  const g2=C*2/(2*2);
  const gp2=-2*C*L/(2**3);
  const p1=g2+gp2*(T-2);
  const diff=Math.abs(g-p1);
  document.getElementById("r3").innerHTML=`
    <h3>Respuesta</h3>
    <div class="step"><b>a) Valor experimental:</b> g = 4π²L/T² = <b>${f(g)} m/s²</b>.<br>
      Error absoluto respecto a ${f(greal)}: <b>${f(Ea)} m/s²</b>.<br>
      Error relativo porcentual: <b>${pct(Er)}</b>.
    </div>
    <div class="step"><b>b) Derivadas parciales:</b><br>
      ∂g/∂L = 4π²/T².<br>
      ∂g/∂T = −8π²L/T³.
    </div>
    <div class="step"><b>c) Propagación del error:</b><br>
      Δg ≈ |∂g/∂L|ΔL + |∂g/∂T|ΔT
      = ${f(dgL)} + ${f(dgT)} = <b>${f(dg)} m/s²</b>.<br>
      Error relativo propagado ≈ <b>${pct(ErProp)}</b>.<br>
      Comparación: el error absoluto observado es ${f(Ea)} m/s², mientras que la incertidumbre propagada es ${f(dg)} m/s².
      ${dg>=Ea ? "La incertidumbre propagada cubre la discrepancia observada, por lo que resulta coherente." : "La incertidumbre propagada no cubre por sí sola la discrepancia observada, por lo que no sería completamente coherente."}
    </div>
    <div class="step"><b>d) Taylor grado 1 de g(T), con L fijo y alrededor de T = 2:</b><br>
      g(T) ≈ g(2) + g′(2)(T−2).<br>
      g(2) = ${f(g2)}; g′(2) = ${f(gp2)}.<br>
      Por tanto, P₁(T) = ${f(g2)} + (${f(gp2)})(T−2).<br>
      Para T = ${f(T)}, P₁(${f(T)}) = <b>${f(p1)} m/s²</b>.<br>
      Diferencia con el cálculo directo: <b>${f(diff)} m/s²</b>.
    </div>
    <div class="step"><b>Relación:</b> tanto la aproximación lineal de Taylor como la propagación del error de primer orden utilizan la derivada (o derivadas parciales) para estimar cómo pequeños cambios en las variables producen cambios aproximados en el resultado.</div>`;
}

window.addEventListener("DOMContentLoaded",()=>{resolver1();resolver2();resolver3();});
