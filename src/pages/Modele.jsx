import { lazy, Suspense } from 'react';
import PageHeader from '../components/PageHeader';
import Tribunes from '../components/Tribunes';
import NextStep from '../components/NextStep';
import Link from '../router/Link';
import { ROUTES } from '../router/context';
import { articleData } from '../data';

const Model3D = lazy(() => import('../components/Model3D'));

export default function Modele() {
    return (
        <>
            <PageHeader
                eyebrow="Perspective Numérique"
                title="Architecture"
                aside={
                    <Link to={ROUTES.histoire} className="btn btn-contour" style={{ '--btn-border': 'var(--color-or)', '--btn-fg': 'var(--color-or)', '--btn-bg-hover': 'var(--color-or)', '--btn-fg-hover': 'var(--color-nuit)' }}>
                        L'Histoire <span className="fleche" aria-hidden="true">→</span>
                    </Link>
                }
            >
                <p className="max-w-xl font-serif text-xl leading-relaxed text-white/75 md:text-[1.375rem]">
                    Le Parc des Princes modélisé sur Blender, à faire tourner sous tous les angles. Survolez les points rouges pour en lire les détails.
                </p>
            </PageHeader>

            <section className="bg-nuit pb-16 md:pb-24" aria-label="Modèle 3D interactif">
                <div className="wrap">
                    <Suspense fallback={<div className="h-[min(78svh,52rem)] min-h-112 border border-white/15"></div>}>
                        <Model3D data={articleData} />
                    </Suspense>
                </div>
            </section>

            <Tribunes />

            <NextStep to={ROUTES.histoire} label="À suivre — L'Histoire" title={articleData.title} />
        </>
    );
}
