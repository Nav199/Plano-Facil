import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, planos }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Plano de negócio - Fácil
                    </h2>
                    <Link
                        href={route('socios')}
                        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Criar seu plano de negócio
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-semibold text-lg">Seus Planos</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                                {planos.length > 0 ? (
                                    planos.map(plano => (
                                        <div key={plano.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                            {/* Exibindo o nome do usuário no título */}
                                            <h4 className="font-semibold">{`${plano.nome}`}</h4>
                                            <Link href={route('plano_executivo', plano.id)} className="text-blue-500 hover:underline">
                                                Ver detalhes
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p>Nenhum plano de negócio encontrado.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
